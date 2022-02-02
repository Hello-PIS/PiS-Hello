package hello.hello.persistence.database

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.core.env.Environment
import org.springframework.jdbc.datasource.DriverManagerDataSource
import javax.sql.DataSource


@Autowired
var env: Environment? = null

@Bean
fun dataSource(): DataSource {
    val dataSource = DriverManagerDataSource()
    dataSource.setDriverClassName(env!!.getProperty("spring.jpa.database-platform")!!)
    dataSource.url = env!!.getProperty("spring.datasource.url")!!
//    dataSource.username = env!!.getProperty("user")
//    dataSource.password = env!!.getProperty("password")
    return dataSource
}