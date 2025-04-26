import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetMyFoods } from "@/data/data";

export const AddPlateToUserOrders = async (
  plate_id: any,
  callback = () => {}
) => {
  const user = auth.currentUser;
  const uid = (user as any).uid;

  const q = query(
    collection(db, "orders"),
    where("uid", "==", uid),
    where("plate_id", "==", plate_id),
    where("checkout", "==", false)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    await setDoc(doc(collection(db, "orders")), {
      uid,
      plate_id,
      quantity: 1,
      checkout: false,
    });
    callback();
  } else {
    const orderDoc = querySnapshot.docs[0];
    const orderRef = doc(db, "orders", orderDoc.id);
    const currentQuantity = orderDoc.data().quantity || 1;

    await updateDoc(orderRef, {
      quantity: currentQuantity + 1,
    });
    callback();
  }
};

export const DecrementPlateInUserOrders = async (
  plate_id: any,
  callback = () => {}
) => {
  const user = auth.currentUser;
  if (!user) return;

  const uid = user.uid;

  const q = query(
    collection(db, "orders"),
    where("uid", "==", uid),
    where("plate_id", "==", plate_id),
    where("checkout", "==", false)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Order does not exist");
    return;
  }

  const orderDoc = querySnapshot.docs[0];
  const orderRef = doc(db, "orders", orderDoc.id);
  const currentQuantity = orderDoc.data().quantity || 0;

  if (currentQuantity > 1) {
    await updateDoc(orderRef, {
      quantity: currentQuantity - 1,
    });
  } else {
    await deleteDoc(orderRef);
  }
  callback();
};

export const DeletePlateInUserOrders = async (
  plate_id: any,
  callback = () => {}
) => {
  const user = auth.currentUser;
  if (!user) return;

  const uid = user.uid;

  const q = query(
    collection(db, "orders"),
    where("uid", "==", uid),
    where("plate_id", "==", plate_id),
    where("checkout", "==", false)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Order does not exist");
    return;
  }

  const orderDoc = querySnapshot.docs[0];
  const orderRef = doc(db, "orders", orderDoc.id);
  await deleteDoc(orderRef);
  callback();
};

export const GetUserPlateIdsInCart = async (callback: any) => {
  const user = auth.currentUser;
  if (!user) {
    callback([]);
    return;
  }

  const uid = user.uid;

  const q = query(
    collection(db, "orders"),
    where("uid", "==", uid),
    where("checkout", "==", false)
  );

  const querySnapshot = await getDocs(q);

  const plateIds = querySnapshot.docs.map((doc) => doc.data().plate_id);
  const bd_orders = querySnapshot.docs.map((doc) => doc.data());
  const my_plates_with_data = GetMyFoods(plateIds);
  const my_final_orders = my_plates_with_data.map((item: any) => {
    let order_found: any = bd_orders.find((ord) => ord.plate_id == item.id);
    return {
      ...item,
      quantity: order_found.quantity,
    };
  });
  callback(my_final_orders);
};
