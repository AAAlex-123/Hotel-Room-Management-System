package alexman.hrms.core.network

data class HrmsNetworkResponse<T>(
    val code: Int,
    val body: T?,
    val errorBody: String? // TODO("do we need this?")
) {
    val ok: Boolean = (200 <= code) && (code < 300)
}