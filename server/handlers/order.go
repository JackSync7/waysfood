package handlers

import (
	dto "dumbmerch/dto/result"
	"dumbmerch/models"
	"dumbmerch/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerOrder struct {
	OrderRepository repositories.OrderRepository
}

func HandlerOrder(OrderRepository repositories.OrderRepository) *handlerOrder {
	return &handlerOrder{OrderRepository}
}

func (h *handlerOrder) FindOrder(c echo.Context) error {
	Order, err := h.OrderRepository.FindOrder()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Order})
}

func (h *handlerOrder) GetOrderbyUser(c echo.Context) error {
	userLogin := c.Get("userLogin")
	buyerId := userLogin.(jwt.MapClaims)["id"].(float64)
	Orders, err := h.OrderRepository.GetOrderbyUser(int(buyerId))

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Orders})
}

func (h *handlerOrder) GetOrder(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Order, err := h.OrderRepository.GetOrder(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Order})
}

func (h *handlerOrder) CreateOrder(c echo.Context) error {
	request := new(models.Order)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// data form pattern submit to pattern entity db user
	Order := models.Order{
		Qty:       request.Qty,
		BuyerID:   request.BuyerID,
		SellerID:  request.SellerID,
		ProductID: request.ProductID,
	}

	data, err := h.OrderRepository.CreateOrder(Order)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerOrder) DeleteOrder(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Order, err := h.OrderRepository.GetOrder(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.OrderRepository.DeleteOrder(Order, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

//	func convertResponse(u models.User) usersdto.UserResponse {
//		return usersdto.UserResponse{
//			ID:        u.ID,
//			Fullname:  u.Fullname,
//			Email:     u.Email,
//			Password:  u.Password,
//			Subscribe: u.Subscribe,
//		}
//	}
// func DeleteResponse(u models.User) usersdto.UserDeleteResponse {
// 	return usersdto.UserDeleteResponse{
// 		ID: u.ID,
// 	}
// }
