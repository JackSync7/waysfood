package routes

import (
	"dumbmerch/handlers"
	"dumbmerch/pkg/middleware"
	"dumbmerch/pkg/mysql"
	"dumbmerch/repositories"

	"github.com/labstack/echo/v4"
)

func OrderRoutes(e *echo.Group) {
	OrderRepository := repositories.RepositoryOrder(mysql.DB)
	h := handlers.HandlerOrder(OrderRepository)

	e.GET("/orders", h.FindOrder)
	e.GET("/order/:id", h.GetOrder)
	e.POST("/order", middleware.Auth(h.CreateOrder))
	e.DELETE("/order/:id", middleware.Auth(h.DeleteOrder))

}
