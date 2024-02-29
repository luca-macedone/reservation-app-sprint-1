import {
  faArrowLeft,
  faCheck,
  faPenToSquare,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { MenuContext } from "../../../screen/dashboard/MenuView";

const DishComponent = ({ dish, updateMenuClbk }) => {
  const { activeMenu, menu } = useContext(MenuContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const newDishCategoryInput = useRef(null);
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: -1,
    category: [],
  });

  const toggleDeleteForm = () => {
    setIsDeleteFormOpen((_prev) => !_prev);
  };

  const handleDeleteDish = async (_id) => {
    await axios
      .delete(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${activeMenu}/Menu/${_id}`
      )
      .then((response) => {
        if (response.status === 200 || response.statusText === "OK") {
          let res = menu.filter((dish) => dish.id !== _id);
          // console.log(res);
          updateMenuClbk(res);
          setIsDeleteFormOpen((_prev) => !_prev);
        }
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addNewDishCategory = () => {
    // console.log(newDishCategoryInput.current.value);
    let value = newDishCategoryInput.current.value;
    let resultArray = value.split("|").filter(Boolean);
    console.log(resultArray);
    setNewDish({ ...newDish, category: resultArray });
    // let res = newDishCategoryInput.current.value;
  };

  const handleChange = (evt) => {
    let name = evt.target.name;
    let value = evt.target.value;
    switch (name) {
      case "edit-dish-name":
        if (value.length > 2) {
          setNewDish({ ...newDish, name: value });
        }
        break;
      case "edit-dish-description":
        if (value.length > 3) {
          setNewDish({ ...newDish, description: value });
        }
        break;
      case "edit-dish-price":
        if (value > 0) {
          setNewDish({ ...newDish, price: value });
        }
        break;
      // case "edit-dish-category":
      //   debouncedUpdateCategory(evt.target.value);
      //   // setNewDish({ ...newDish, category: categoryArray });
      //   break;
      default:
        console.log("input name no match");
    }
  };

  const handleEditDish = () => {
    setNewDish({
      name: "",
      description: "",
      price: -1,
      category: [],
    });
    setIsEditMode((_prev) => !_prev);
  };

  const handleEditSubmit = async (_id) => {
    if (newDish.name.length > 2 && newDish.price > 0) {
      await axios
        .put(
          `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${activeMenu}/Menu/${_id}`,
          newDish
        )
        .then((response) => {
          if (response.status === 200) {
            // let res = menu.filter((dish) => dish.id !== _id);
            let updatedIndex = menu.findIndex((d) => d.id === dish.id);
            let res = [...menu];
            res[updatedIndex] = newDish;
            // console.log(res);
            updateMenuClbk(res);
          }
          // console.log(response);
        })
        .catch((err) => console.log(err));
    }
  };

  const formattedCategories = () => {
    let res = "";
    dish.category.forEach((element) => {
      res = res.concat(element + "|");
    });
    return res;
  };

  return (
    <div
      key={dish.id}
      className="w-full"
    >
      <div className="w-full flex items-center justify-end">
        <div className="w-max flex items-center justify-end gap-3 bg-light px-3 pt-3 rounded-t-2xl">
          {!isEditMode ? (
            <button
              className="bg-accent text-light ring-2 ring-accent hover:bg-light hover:text-accent rounded-lg px-4 py-2 transition-all ease-in-out duration-200"
              onClick={handleEditDish}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="me-2"
              />
              Edit
            </button>
          ) : (
            <>
              <button
                className="bg-accent text-light ring-2 ring-accent hover:bg-light hover:text-accent rounded-lg px-4 py-2 transition-all ease-in-out duration-200"
                onClick={handleEditDish}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="me-2"
                />
                Back
              </button>
              <button
                className="bg-accent text-light ring-2 ring-accent hover:bg-light hover:text-accent rounded-lg px-4 py-2 transition-all ease-in-out duration-200"
                onClick={() => handleEditSubmit(dish.id)}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="me-2"
                />
                Done
              </button>
            </>
          )}
          {isDeleteFormOpen ? (
            <>
              <strong className="ms-5">Are you sure?</strong>
              <button
                className="bg-accent text-light ring-2 ring-accent hover:bg-light hover:text-accent rounded-lg px-4 py-2 transition-all ease-in-out duration-200"
                onClick={toggleDeleteForm}
              >
                <FontAwesomeIcon
                  icon={faX}
                  className="me-2"
                />
                No
              </button>
              <button
                className="bg-accent text-light ring-2 ring-accent hover:bg-light hover:text-accent rounded-lg px-4 py-2 transition-all ease-in-out duration-200"
                onClick={() => handleDeleteDish(dish.id)}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="me-2"
                />
                Yes
              </button>
            </>
          ) : (
            <button
              className="bg-accent text-light ring-2 ring-accent hover:bg-light hover:text-accent rounded-lg px-4 py-2 transition-all ease-in-out duration-200"
              onClick={toggleDeleteForm}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="me-2"
              />
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="p-5 bg-light rounded-3xl rounded-tr-none w-full flex flex-col items-start gap-2">
        {!isEditMode ? (
          <>
            <div className="flex items-start flex-col-reverse justify-between w-full">
              <div className="flex items-start justify-between w-full">
                <div>
                  <h6 className="font-semibold border-b-2 mb-2 border-secondary w-max px-3">
                    {dish.name}
                  </h6>
                  <p className="text-sm px-3">{dish.description}</p>
                </div>
                <div className="text-nowrap pe-3">{dish.price} €</div>
              </div>
            </div>
            <div className="px-3 flex items-center gap-2 flex-wrap">
              {dish.category.map((c, index) => {
                return (
                  <span
                    className="bg-primary text-light px-3 py-1 rounded-2xl"
                    key={index}
                  >
                    {c}
                  </span>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start flex-col-reverse justify-between w-full">
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col w-full gap-3">
                  <input
                    type="text"
                    name="edit-dish-name"
                    defaultValue={dish.name}
                    id="edit-dish-name"
                    className="px-3 py-2 rounded-xl focus:outline-accent"
                    onChange={handleChange}
                  />
                  <textarea
                    name="edit-dish-description"
                    id="edit-dish-description"
                    defaultValue={dish.description}
                    className="px-3 py-2 rounded-xl focus:outline-accent"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <input
                  type="number"
                  name="edit-dish-price"
                  id="edit-dish-price"
                  defaultValue={dish.price}
                  className="px-3 py-2 rounded-xl ms-3 focus:outline-accent"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  id="edit-dish-category"
                  className="px-3 py-2 rounded-l-xl focus:outline-accent"
                  name="edit-dish-category"
                  ref={newDishCategoryInput}
                  defaultValue={formattedCategories()}
                />
                <button
                  className="bg-accent px-2 py-2 rounded-r-lg text-light hover:bg-light hover:text-accent transition-all ease-in-out duration-200"
                  onClick={addNewDishCategory}
                  type="button"
                >
                  Insert
                </button>
              </div>
              <small>
                ** Use this symbol{" "}
                <strong className="text-xl text-accent">|</strong> to divide the
                categories
              </small>
            </div>
            {/* <input
              type="text"
              name="edit-dish-category"
              id="edit-dish-category"
              defaultValue={formattedCategories()}
              className="px-3 py-2 rounded-xl"
            /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default DishComponent;
