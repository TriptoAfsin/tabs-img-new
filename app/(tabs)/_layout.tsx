import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, Modal, View, StyleSheet} from "react-native";
import { useState, useRef } from "react";
import { Box, Text} from "native-base";

import Colors from "../../constants/Colors";
import AddProduct from "../../components/forms/AddProduct";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        style={{
          marginTop: 22,
          marginBottom: 22,
        }}
      >
        <View style={styles.modalView}>
          {/* <Modal.CloseButton /> */}
          <View>
            <Box display={'flex'} flexDir={'row'}>
            <Text fontSize={20} fontWeight={600} minW={'90%'}>
              Add Product
            </Text>
            <Pressable>
                <FontAwesome name="window-close" size={30} color={"black"} onPress={() => setModalVisible(false)}/>
            </Pressable>
            </Box>
            <AddProduct
              ref={initialRef}
              setModal={setModalVisible}
            />
          </View>
        </View>
      </Modal>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Products",
            tabBarIcon: ({ color }) => {
              return (
                <>
                <TabBarIcon name="dropbox" color={color} />
                </>
              )
          },
            headerRight: () => (
              <Box display={'flex'} flexDir={'row'}> 
               <Link href="/search" asChild>
               <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="search"
                      size={35}
                      color={'#f3f4f6'}
                      style={{ marginRight: 30, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
               </Link>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      onPress={() => {
                        setModalVisible(true);
                      }}
                      name="plus"
                      size={35}
                      color={'#f3f4f6'}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Box>
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Racks",
            tabBarIcon: ({ color }) => <TabBarIcon name="table" color={color} />,
            headerRight: () => (
              <>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={'#f3f4f6'}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </>
            ),
          }}
        />
      </Tabs>
    </>
  );
}
