package Resources

// this is used to config back-end server which is at Config/Back-end.yaml
type Config struct {
	ServerPort   int    `yaml:"server port"`
	JwtSecretKey string `yaml:"jwt secret key"`
	DBHost       string `yaml:"database host"`
	DBPort       string `yaml:"database port"`
	DBUser       string `yaml:"database user"`
	DBPass       string `yaml:"database password"`
	DBName       string `yaml:"database name"`
}
