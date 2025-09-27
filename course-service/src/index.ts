import app, { initializeApp } from "./app"
import courseRoutes from "./routes/course.routes"
import enrollmentRoutes from "./routes/enrollment.routes"
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "../swagger/swagger.json"

const PORT = process.env.PORT || 4000

initializeApp()
  .then((appInstance) => {
    appInstance.use("/api/courses", courseRoutes)
    appInstance.use("/api/enrollments", enrollmentRoutes)
    appInstance.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    appInstance.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
      console.log(`Swagger docs at http://localhost:${PORT}/api-docs`)
    })
  })
  .catch((err) => {
    console.error("Failed to initialize app", err)
  })
