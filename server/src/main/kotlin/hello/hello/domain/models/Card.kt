package hello.hello.domain.models

data class Card(
    var id: Int,
    var mode: String,
    var path: String?,
    var category: String?,
    var company: String?,
    var name: String?,
    var phone: String?,
    var email: String?,
    var owner: String
)
