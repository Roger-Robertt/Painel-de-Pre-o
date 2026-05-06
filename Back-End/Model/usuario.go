package model

type Usuario struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Nome    string `gorm:"not null" json:"nome"`
	Email    string `gorm:"not null" json:"email"`
	Senha    string `gorm:"not null" json:"senha"`
}

func (Usuario) TableName() string {
    return "usuarios"
}