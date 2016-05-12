package main

import (
	"fmt"
	"github.com/shikher9/ScalableWebCache/client"
	"os"
	"strconv"
)

func main() {

	//obtain port and convert it to int

	if len(os.Args) != 2 {
		fmt.Println("Client requires port for starting - Enter port in the following format : ",
			"\nclient_app_windows [port]")

	}

	port, error := strconv.Atoi(os.Args[1])

	if error != nil {
		fmt.Println("Error - Only digits are allowed in port")
	}

	//start client
	fmt.Println("Starting at port : ", port)

	client.Start(port)

}
