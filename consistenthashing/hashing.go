/**
Consistent hashing implementation in golang

packages used -

github.com/emirpasic/gods/maps/treemap - treemap implementation in golang.
hash/crc64 - used for hashing keys and redis nodes
github.com/project/node - redis node representation
*/
package consistenthashing

import "github.com/emirpasic/gods/maps/treemap"
import "hash/crc64"
import "github.com/shikher9/ScalableWebCache/node"
import "strconv"
import "fmt"

//adds a redis node to circle(ring) treemap and returns its hash
func AddToCircle(node node.Node, circle *treemap.Map) uint64 {

	//Generating a string identified for a redis node and using it for calculating
	//hash. In production, this will be the redis server url.
	nodeStr := "localhost:" + strconv.Itoa(node.Port)

	//calculating hash
	hash := Hashcode(nodeStr)

	//adding hash value and node identifier to treemap
	circle.Put(hash, nodeStr)
	fmt.Println("Added Node", nodeStr, "Hashcode", hash)

	return hash
}

//removes a redis node to circle(ring) treemap
func RemoveFromCircle(node node.Node, circle *treemap.Map) {

	//Generate a string identifier for redis node
	nodeStr := "localhost:" + strconv.Itoa(node.Port)

	//use this string identifier for removing the node from the treemap
	circle.Remove(Hashcode(nodeStr))
	fmt.Println("Removed Node", nodeStr, "Hashcode", Hashcode(nodeStr))
}

//hash function
func Hashcode(data string) uint64 {
	crcTable := crc64.MakeTable(crc64.ECMA)
	return crc64.Checksum([]byte(data), crcTable)
}

// Gets hash value of the redis node which will store the key
func GetNodeHashForKey(key string, circle *treemap.Map) uint64 {

	keyHash := Hashcode(key)
	keys := circle.Keys()

	return keys[getNodeIndex(keys, keyHash, 0, circle)].(uint64)
}

//Gets the index of the redis node in the circle(ring)
func getNodeIndex(keys []interface{}, keyHash uint64, index int, circle *treemap.Map) int {

	if index < circle.Size() && keyHash > keys[index].(uint64) {
		return getNodeIndex(keys, keyHash, index+1, circle)
	} else if index < circle.Size() && keyHash < keys[index].(uint64) {
		return index
	} else if index == circle.Size() {
		return 0
	}

	return 0
}
