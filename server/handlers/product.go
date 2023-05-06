package handlers

import (
	productdto "dumbmerch/dto/product"
	dto "dumbmerch/dto/result"
	"fmt"

	"dumbmerch/models"

	"dumbmerch/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

var path_file = "http://localhost:5000/uploads/"

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandlerProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) FindProduct(c echo.Context) error {
	Products, err := h.ProductRepository.FindProduct()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	for i, p := range Products {
		Products[i].Image = path_file + p.Image
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Products})
}
func (h *handlerProduct) FindProductMovie(c echo.Context) error {
	Products, err := h.ProductRepository.FindProductMovie()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	for i, p := range Products {
		Products[i].Image = path_file + p.Image
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Products})
}
func (h *handlerProduct) FindProductSeries(c echo.Context) error {
	Products, err := h.ProductRepository.FindProductSeries()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	for i, p := range Products {
		Products[i].Image = path_file + p.Image
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Products})
}

func (h *handlerProduct) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var Product models.Product
	Product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	Product.Image = path_file + Product.Image
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Product})
}

func (h *handlerProduct) CreateProduct(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	Price, _ := strconv.ParseInt(c.FormValue("price"), 10, 64)
	Qty, _ := strconv.Atoi(c.FormValue("qty"))
	UserId, _ := strconv.Atoi(c.FormValue("user_id"))
	request := productdto.CreateProductRequest{
		Title:  c.FormValue("title"),
		Image:  dataFile,
		Price:  Price,
		Qty:    Qty,
		UserId: UserId,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// data form pattern submit to pattern entity db Product
	Products := models.Product{
		Title:  request.Title,
		Image:  request.Image,
		Price:  request.Price,
		Qty:    request.Qty,
		UserID: request.UserId,
	}

	data, err := h.ProductRepository.CreateProduct(Products)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerProduct) UpdateProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	Product, err := h.ProductRepository.GetProduct(id)
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	Price, _ := strconv.ParseInt(c.FormValue("price"), 10, 64)
	Qty, _ := strconv.Atoi(c.FormValue("qty"))

	request := productdto.UpdateProductRequest{
		Title: c.FormValue("title"),
		Image: dataFile,
		Price: Price,
		Qty:   Qty,
	}

	if request.Title != "" {
		Product.Title = request.Title
	}
	if request.Image != "" {
		Product.Image = request.Image
	}
	if request.Price != 0 {
		Product.Price = request.Price
	}
	if request.Qty != 0 {
		Product.Qty = request.Qty
	}

	data, err := h.ProductRepository.UpdateProduct(Product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerProduct) DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.ProductRepository.DeleteProduct(Product, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertDeleteProduct(data)})
}

func convertDeleteProduct(u models.Product) productdto.DeleteProductResponse {
	return productdto.DeleteProductResponse{
		ID: u.ID,
	}
}
