package repositories

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type OrderRepository interface {
	CreateOrder(Order models.Order) (models.Order, error)
	DeleteOrder(Order models.Order, ID int) (models.Order, error)
	FindOrder() ([]models.Order, error)
	GetOrderbyUser(ID int) ([]models.Order, error)
	GetOrder(ID int) (models.Order, error)
}

func RepositoryOrder(db *gorm.DB) *repository {
	return &repository{db}
}
func (r *repository) FindOrder() ([]models.Order, error) {
	var Order []models.Order
	err := r.db.Preload("Buyer").Preload("Seller").Find(&Order).Error

	return Order, err
}
func (r *repository) GetOrderbyUser(ID int) ([]models.Order, error) {
	var Order []models.Order
	err := r.db.Where("buyer_id = ?", ID).Preload("Buyer").Preload("Seller").Find(&Order).Error

	return Order, err
}

func (r *repository) GetOrder(ID int) (models.Order, error) {
	var Order models.Order
	err := r.db.First(&Order, ID).Error

	return Order, err
}

func (r *repository) CreateOrder(Order models.Order) (models.Order, error) {
	err := r.db.Preload("").Create(&Order).Error

	return Order, err
}

func (r *repository) DeleteOrder(Order models.Order, ID int) (models.Order, error) {
	err := r.db.Delete(&Order, ID).Scan(&Order).Error

	return Order, err
}
