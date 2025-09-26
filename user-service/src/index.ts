import app from "./app";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";


const swaggerDocument = require("../swagger/swagger.json");


app.use("/users", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "user-service" });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 User service running at http://localhost:${PORT}`);
  console.log(`📖 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
