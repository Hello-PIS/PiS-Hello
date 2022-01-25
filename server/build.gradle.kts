import groovy.lang.GroovyObject
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.jfrog.gradle.plugin.artifactory.dsl.PublisherConfig

plugins {
	id("org.springframework.boot") version "2.6.1"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	kotlin("jvm") version "1.6.0"
	kotlin("plugin.spring") version "1.6.0"
	kotlin("plugin.jpa") version "1.6.0"
	`maven-publish`
	id("com.jfrog.artifactory") version "4.18.3"
	jacoco
}

group = "pis-hello"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
	mavenCentral()
}

dependencies {
	val springBootVersion = "2.6.2"
	val jacocoVersion = "0.8.7"
	val sqliteJDBCVersion = "3.36.0.2"

	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.springframework.boot:spring-boot-starter:$springBootVersion")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa:$springBootVersion")
	implementation("org.springframework.boot:spring-boot-starter-web:$springBootVersion")
	implementation("org.xerial:sqlite-jdbc:$sqliteJDBCVersion")
	implementation("org.jacoco:org.jacoco.core:$jacocoVersion")
	implementation(platform("com.google.cloud:libraries-bom:24.1.0"))
	implementation("com.google.cloud:google-cloud-storage")

	testImplementation("org.springframework.boot:spring-boot-starter-test:$springBootVersion")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		jvmTarget = "11"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.test {
	finalizedBy(tasks.jacocoTestReport)
}
tasks.jacocoTestReport {
	dependsOn(tasks.test)
}

apply(plugin = "com.jfrog.artifactory")

publishing {
	(publications) {
		register("mavenJava", MavenPublication::class) {
			from(components["java"])
		}
	}
}

artifactory {
	setContextUrl(project.findProperty("artifactory_contextUrl"))

	publish(delegateClosureOf<PublisherConfig> {
		repository(delegateClosureOf<GroovyObject> {
			setProperty("repoKey", "hello-gradle-dev-local")
			setProperty("username", project.findProperty("artifactory_user"))
			setProperty("password", project.findProperty("artifactory_password"))
			setProperty("maven", true)
		})
		defaults(delegateClosureOf<GroovyObject> {
			invokeMethod("publications", "mavenJava")
			setProperty("publishArtifacts", true)
		})
	})
}
