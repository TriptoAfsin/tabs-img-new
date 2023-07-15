import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { useState, useRef } from "react";
import { Modal } from "native-base";

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

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add Product</Modal.Header>
          <Modal.Body>
          <AddProduct ref={initialRef} setModal={setModalVisible}/>
          </Modal.Body>
        </Modal.Content>
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
            tabBarIcon: ({ color }) => <TabBarIcon name="dropbox" color={color} />,
            headerRight: () => (
              <>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      onPress={() => {
                        setModalVisible(true);
                      }}
                      name="plus"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </>
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
                      color={Colors[colorScheme ?? "light"].text}
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
