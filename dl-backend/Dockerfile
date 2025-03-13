
# Use Maven for building the project
FROM maven:3.8.5-openjdk-17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the project files to the container
COPY ./dl-backend /app

# Verify that pom.xml exists
RUN ls -la /app

# Build the project
RUN mvn clean package -DskipTests

# Use a lightweight JDK image for running the application
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
