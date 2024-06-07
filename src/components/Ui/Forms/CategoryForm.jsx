import { Formik, Form } from "formik";
import { FaPlus } from "react-icons/fa";
import * as Yup from "yup";
import Button from "../Buttons/Button";
import Input from "../Inputs/Input";
import TextArea from "../Inputs/TextArea";
import Select from "../Inputs/Select";
import { useUserContext } from "../../../context/AuthContext";
import {
  useAddCategoryMutation,
  useCategoriesQuery,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
} from "../../../services/Queries";
import { useState } from "react";

const CategoryForm = ({ onClose }) => {
  const { user } = useUserContext();
  const categoriesQuery= useCategoriesQuery();
  const addCategoryMutation = useAddCategoryMutation();
  const editCategoryMutation = useEditCategoryMutation();
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const [isNewCategory, setIsNewCategory] = useState(false);

  const handleReset = (resetForm) => {
    resetForm({
      selectedCategory: "",
      name: "",
      description: "",
    });
    setIsNewCategory(true);
  };

  return (
    <Formik
      initialValues={{
        selectedCategory: "",
        name: "",
        description: "",
      }}
      validationSchema={Yup.object({
        selectedCategory: Yup.string(),
        name: Yup.string().required("Required"),
        description: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (values.selectedCategory && !isNewCategory) {
          editCategoryMutation.mutate({
            id: values.selectedCategory,
            category: {
              name: values.name,
              description: values.description,
              user: user.id,
            },
          });
        } else {
          addCategoryMutation.mutate({
            name: values.name,
            description: values.description,
            user: user.id,
          });
        }
        setSubmitting(false);
        resetForm();
        setIsNewCategory(false);
      }}
    >
      {(formik) => {
        return (
          <Form>
            <div className="p-4 space-y-4">
              <div>
                <h1 className="text-3xl font-semibold">Manage Categories</h1>
              </div>
              <div className="flex items-center justify-center flex-row gap-x-4">
                <Select
                  name="selectedCategory"
                  onChange={(e) => {
                    const selectedCat = categoriesQuery.data.find(
                      (cat) => cat.id === Number(e.target.value)
                    );

                    formik.setFieldValue("selectedCategory", e.target.value);
                    formik.setFieldValue("name", selectedCat?.name || "");
                    formik.setFieldValue(
                      "description",
                      selectedCat?.description || ""
                    );
                    setIsNewCategory(false);
                  }}
                >
                  <option value="">
                    {isNewCategory ? "New Category" : "Select a category"}
                  </option>
                  {categoriesQuery.data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <Button
                  type="button"
                  className="bg-teal-500 hover:bg-teal-700 ml-2"
                  onClick={() => handleReset(formik.resetForm)}
                >
                  <FaPlus />
                </Button>
              </div>
              <div className="flex items-start flex-col gap-x-4">
                <label htmlFor="name">Name:</label>
                <Input id="name" name="name" />
              </div>
              <div className="flex items-start flex-col gap-x-4">
                <label htmlFor="description">Description:</label>
                <TextArea
                  id="description"
                  name="description"
                  className="w-full"
                />
              </div>
              <div className="flex justify-between gap-3">
                <Button
                  onClick={() => {
                    deleteCategoryMutation.mutate(
                      formik.values.selectedCategory
                    );
                    handleReset(formik.resetForm);
                  }}
                  type="button"
                  className="bg-red-500 hover:bg-red-700"
                >
                  Delete Category
                </Button>
                <div className="flex justify-end gap-3">
                  <Button
                    onClick={onClose}
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700"
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700"
                  >
                    Save Category
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CategoryForm;
