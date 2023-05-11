import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import SoloAlert from "soloalert";
const AddNews = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { title, description, image } = form;
    const newErrors = {};
    // Topic errors
    if (!title || title === "") newErrors.title = "title cannot be blank!";
    else if (title.length > 30) newErrors.title = "title is too long!";
    // Description errors
    if (!description || description === "")
      newErrors.description = "description cannot be blank";
    else if (description.length > 300)
      newErrors.description = "description is too long!";

    // Farmer Name errors
    if (!image || image === "") newErrors.image = "cannot be blank!";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      setIsLoading(true);
      // No errors! Put any logic here for the form submission!
      const data = (
        await axios.post("http://localhost:3007/api/v1/news/add/", form)
      ).status;
      console.log(data);
      if (data === 201) {
        SoloAlert.alert({
          title: "Success!",
          body: "Appointment added successfully",
          icon: "success",
          theme: "dark",
          useTransparency: true,
          onOk: function () {},
        });
        navigate("/test");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="version-controller">
        <div className="mt-5">
          <h2>Add News</h2>
          <hr />
        </div>
        <Form>
          <Form.Group className="form-group row mb-3">
            <Form.Label className="col-3">Titile * </Form.Label>
            <div className="col-9">
              <Form.Control
                type="text"
                onChange={(e) => setField("title", e.target.value)}
                // value={form.name || ""}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="form-group row mb-3">
            <Form.Label className="col-3">Description * </Form.Label>
            <div className="col-9">
              <Form.Control
                type="text"
                onChange={(e) => setField("description", e.target.value)}
                // value={form.name || ""}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="form-group row mb-3">
            <Form.Label className="col-3">Image * </Form.Label>
            <div className="col-9">
              <Form.Control
                type="text"
                onChange={(e) => setField("image", e.target.value)}
                // value={form.name || ""}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <div className="text-end">
            <Button variant="danger">Cancel</Button>

            <Button
              disabled={isLoading}
              style={{ margin: "5px" }}
              variant="success"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Save and Close
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddNews;
