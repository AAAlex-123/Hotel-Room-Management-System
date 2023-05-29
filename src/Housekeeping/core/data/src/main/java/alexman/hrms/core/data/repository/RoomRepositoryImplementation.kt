package alexman.hrms.core.data.repository

import alexman.hrms.core.data.model.asExternalModel
import alexman.hrms.core.data.model.asUpstreamNetworkNoteDetails
import alexman.hrms.core.data.model.asUpstreamNetworkRoomUpdateDetails
import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.model.data.UpstreamNoteDetails
import alexman.hrms.core.model.data.UpstreamRoomUpdateDetails
import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.model.NetworkNote
import alexman.hrms.core.network.model.NetworkRoom
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow

// TODO("add dispatcher for datasource calls")

class RoomRepositoryImplementation(
    private val datasource: HrmsNetworkDataSource,
) : RoomRepository {

    /* TODO("figure out automatic updates")
     * - add automatic polling for data (see `refresh()`)
     * - maybe add some diffing when getting data to update only the necessary flows?
     */

    private val roomCache = RoomCache(datasource)
    private val singleRoomCache = SingleRoomCache(datasource)
    private val noteCache = NoteCache(datasource)

    private val roomFlowMap: MutableMap<RoomQuery, MutableStateFlow<List<Room>>> = mutableMapOf()
    private val singleRoomFlowMap: MutableMap<SingleRoomQuery, MutableStateFlow<Room>> =
        mutableMapOf()
    private val noteFlowMap: MutableMap<NoteQuery, MutableStateFlow<List<Note>>> = mutableMapOf()

    override suspend fun getRooms(query: RoomQuery): Flow<List<Room>> {
        if (!roomFlowMap.containsKey(query)) {
            val rooms = getFilteredRoomsFromCacheForNewQuery(query)
            roomFlowMap[query] = MutableStateFlow(rooms)
        }

        return roomFlowMap[query]!!
    }

    override suspend fun getSingleRoom(query: SingleRoomQuery): Flow<Room> {
        if (!singleRoomFlowMap.containsKey(query)) {
            val room = getSingleRoomFromCacheForNewQuery(query)
            singleRoomFlowMap[query] = MutableStateFlow(room)
        }

        return singleRoomFlowMap[query]!!
    }

    override suspend fun updateRoomState(upstreamRoomUpdateDetails: UpstreamRoomUpdateDetails) {

        val response = /* withContext(ioDispatcher) { */
            datasource.updateRoomState(
                upstreamRoomUpdateDetails.asUpstreamNetworkRoomUpdateDetails()
            )
        /* } */

        if (response.ok) {
            val updatedRoom = response.body!!.asExternalModel()
            singleRoomCache.updateRoom(updatedRoom)
            updateSingleRoomFlowsAffectedByRoom(updatedRoom)

            roomCache.updateRoom(updatedRoom)
            updateRoomFlowsAffectedByRoom(updatedRoom)
        } else {
            TODO("figure out what to do on PUT error")
        }
    }

    override suspend fun getNotes(query: NoteQuery): Flow<List<Note>> {
        if (!noteFlowMap.containsKey(query)) {
            val notes = getFilteredNotesFromCacheForNewQuery(query)
            noteFlowMap[query] = MutableStateFlow(notes)
        }

        return noteFlowMap[query]!!
    }

    override suspend fun addNote(upstreamNoteDetails: UpstreamNoteDetails) {

        val response = /* withContext(ioDispatcher) { */
            datasource.addNote(
                upstreamNoteDetails.asUpstreamNetworkNoteDetails()
            )
        /* } */

        if (response.ok) {
            val newNote = response.body!!.asExternalModel()
            noteCache.placeNote(newNote)
            updateNoteFlowsAffectedByNote(newNote)
        } else {
            TODO("figure out what to do on POST error")
        }
    }

    override suspend fun deleteNote(noteId: Int) {

        val response = /* withContext(ioDispatcher) { */
            datasource.deleteNote(noteId)
        /* } */

        if (response.ok) {
            val deletedNote = noteCache.deleteNote(noteId)
            updateNoteFlowsAffectedByNote(deletedNote)
        } else {
            TODO("figure out what to do on DELETE error")
        }
    }

    private suspend fun getFilteredRoomsFromCacheForNewQuery(query: RoomQuery): List<Room> {
        return roomCache.getFilteredRoomsForNewQuery(query)
    }

    private suspend fun getSingleRoomFromCacheForNewQuery(query: SingleRoomQuery): Room {
        return singleRoomCache.getSingleRoomForNewQuery(query)
    }

    private suspend fun getFilteredNotesFromCacheForNewQuery(query: NoteQuery): List<Note> {
        return noteCache.getFilteredNotesForNewQuery(query)
    }

    private fun updateRoomFlowsAffectedByRoom(room: Room) {
        roomFlowMap.forEach { (roomQuery, mutableStateFlow) ->
            // TODO("try to make match work, but this hack will do")
            // See RoomRepository.kt:15 for more info
            // if (roomQuery.matches(room))
            mutableStateFlow.value = getFilteredRoomsFromCacheForExistingQuery(roomQuery)
        }
    }

    private fun updateSingleRoomFlowsAffectedByRoom(room: Room) {
        singleRoomFlowMap.forEach { (singleRoomQuery, mutableStateFlow) ->
            if (singleRoomQuery.matches(room))
                mutableStateFlow.value =
                    getFilteredSingleRoomFromCacheForExistingQuery(singleRoomQuery)
        }
    }

    private fun updateNoteFlowsAffectedByNote(note: Note) {
        noteFlowMap.forEach { (noteQuery, mutableStateFlow) ->
            if (noteQuery.matches(note))
                mutableStateFlow.value = getFilteredNotesFromCacheForExistingQuery(noteQuery)
        }
    }

    private fun getFilteredRoomsFromCacheForExistingQuery(query: RoomQuery): List<Room> {
        return roomCache.getFilteredRoomsForExistingQuery(query)
    }

    private fun getFilteredSingleRoomFromCacheForExistingQuery(query: SingleRoomQuery): Room {
        return singleRoomCache.getSingleRoomForExistingQuery(query)
    }

    private fun getFilteredNotesFromCacheForExistingQuery(query: NoteQuery): List<Note> {
        return noteCache.getFilteredNotesForExistingQuery(query)
    }

    private suspend fun refresh() {
        /* TODO("figure out algorithm")
            - val orderDiffList = orderCache.refreshAndGetDiff()
            - orderDiffList.forEach { updateFlowsAffectedByOrder(it) }
         */

        // TODO("add refresh to every cache")
    }

    private class RoomCache(
        private val datasource: HrmsNetworkDataSource,
    ) {

        private val querySet: MutableSet<RoomQuery> = mutableSetOf()
        private val roomMap: MutableMap<Int, MutableList<Room>> = mutableMapOf()

        // TODO("refresh fun")

        suspend fun getFilteredRoomsForNewQuery(query: RoomQuery): List<Room> {
            if (querySet.contains(query)) {
                error("Query $query already exists in cache")
            }

            querySet.add(query)
            updateMapWithRoomsFromQuery(query)
            return getFilteredRoomsForExistingQuery(query)
        }

        fun getFilteredRoomsForExistingQuery(query: RoomQuery): List<Room> {
            if (!querySet.contains(query)) {
                error("Query $query does not exist in cache")
            }

            return roomMap[query.cleaningStaffId]!!
        }

        fun updateRoom(room: Room) {
            roomMap.values
                .forEach {
                    it.forEachIndexed { index, _room ->
                        if (_room.id == room.id) {
                            it[index] = room
                        }
                    }
                }
        }

        private suspend fun updateMapWithRoomsFromQuery(query: RoomQuery) {
            val response = datasource.getRooms(query.cleaningStaffId)

            if (response.ok) {
                roomMap[query.cleaningStaffId] = response.body!!
                    .map(NetworkRoom::asExternalModel)
                    .toMutableList()
            } else {
                TODO("figure out what to do on GET error")
            }
        }
    }

    private class SingleRoomCache(
        private val datasource: HrmsNetworkDataSource,
    ) {
        private val querySet: MutableSet<SingleRoomQuery> = mutableSetOf()
        private val singleRoomMap: MutableMap<String, Room> = mutableMapOf()

        // TODO("refresh fun")

        suspend fun getSingleRoomForNewQuery(query: SingleRoomQuery): Room {
            if (querySet.contains(query)) {
                error("Query $query already exists in cache")
            }

            querySet.add(query)
            updateMapWithSingleRoomFromQuery(query)
            return getSingleRoomForExistingQuery(query)
        }

        fun getSingleRoomForExistingQuery(query: SingleRoomQuery): Room {
            if (!querySet.contains(query)) {
                error("Query $query does not exist in cache")
            }

            return singleRoomMap[query.roomId]!!
        }

        fun updateRoom(room: Room) {
            singleRoomMap[room.id] = room
        }

        private suspend fun updateMapWithSingleRoomFromQuery(query: SingleRoomQuery) {
            val response = datasource.getSingleRoom(query.roomId)

            if (response.ok) {
                with(response.body!!) {
                    singleRoomMap[this.id] = this.asExternalModel()
                }
            } else {
                // TODO("figure out what to do on GET error")
            }
        }
    }

    private class NoteCache(
        private val datasource: HrmsNetworkDataSource,
    ) {
        private val querySet: MutableSet<NoteQuery> = mutableSetOf()
        private val noteMap: MutableMap<Int, Note> = mutableMapOf()

        suspend fun getFilteredNotesForNewQuery(query: NoteQuery): List<Note> {
            if (querySet.contains(query)) {
                error("Query $query already exists in cache")
            }

            querySet.add(query)
            updateMapWithNotesFromQuery(query)
            return getFilteredNotesForExistingQuery(query)
        }

        fun getFilteredNotesForExistingQuery(query: NoteQuery): List<Note> {
            if (!querySet.contains(query)) {
                error("Query $query does not exist in cache")
            }

            return noteMap.values
                .filter { query.matches(it) }
        }

        fun placeNote(note: Note) {
            noteMap[note.id] = note
        }

        fun deleteNote(noteId: Int): Note {
            return noteMap.remove(noteId)!!
        }

        private suspend fun updateMapWithNotesFromQuery(query: NoteQuery) {
            val response = datasource.getNotes(query.roomId)

            if (response.ok) {
                response.body!!
                    .map(NetworkNote::asExternalModel)
                    .forEach { noteMap[it.id] = it }
            } else {
                // TODO("figure out what to do on GET error")
            }
        }
    }
}
