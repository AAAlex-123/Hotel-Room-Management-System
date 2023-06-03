import org.json.JSONObject

class Employee(var name: String, var useranme: String, var login: String, var type: EmployeeType) : JSONAble {
    override fun toJsonObject(): JSONObject {
        val ret = JSONObject()
        ret.put("name", name)
        ret.put("username", useranme)
        ret.put("password", login)
        ret.put("type", type.name)
        return ret
    }

}
