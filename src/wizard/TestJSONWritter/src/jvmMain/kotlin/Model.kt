import org.json.JSONArray
import org.json.JSONObject

class Floor(var floor: Number, val rooms: MutableList<Room>){
    fun toJsonObject(): JSONArray {
        val roomArray = JSONArray()
        rooms.forEach {
            val jsonObject = JSONObject()
            jsonObject.put("floor", floor)
            jsonObject.put("room_id", it.roomId)
            jsonObject.put("roomType", it.roomType)
            jsonObject.put("roomClass", it.roomClass)
            roomArray.put(jsonObject)
        }
        return roomArray
    }
}

class Room(var roomId: String, var roomType: String, var roomClass: String)


enum class Page { ROOM, EMPLOYEE, SEND }
enum class EmployeeType {
    HOUSEKEEPER, CHAMBERMAID, RECEPTION
}