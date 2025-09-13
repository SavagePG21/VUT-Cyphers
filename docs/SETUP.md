## Project Setup Guide: Cyphers Bank Web App

To run and explore this project, follow the steps below:

###  Prerequisites

Before you begin, make sure you have the following installed:

- **Java JDK (version 17 or higher)**  
- **IntelliJ IDEA (Community or Ultimate Edition)**  
- **Maven** (comes bundled with IntelliJ)
- **Spring Boot** with the following dependencies:
  - spring-boot-starter-web  

---

###  Technologies Used

This project combines frontend and backend technologies for a full-stack experience:

| Layer        | Technology Used            |
|--------------|-----------------------------|
| Frontend     | HTML, CSS, JavaScript       |
| Backend      | Java with Spring Boot       |
| IDE          | IntelliJ IDEA               |
| Build Tool   | Maven                       |

---

###  How to Set Up the Project in IntelliJ

1. **Open IntelliJ IDEA**
2. **Create a new Spring Boot project**:
   - Use the Spring Initializr
   - Add the dependency: `spring-boot-starter-web`
3. **Place your HTML, CSS, and JS files** in the `src/main/resources/static` folder
4. **Create your controller** in `src/main/java/.../controller/HomeController.java`
5. **Run the application** using the green play button or `mvn spring-boot:run`

---

###  Testing the App

- Navigate to `http://localhost:8080` in your browser
- Use the hardcoded login credentials (e.g., `admin / 1234`)
- On successful login, you'll be redirected to the dashboard page

---

