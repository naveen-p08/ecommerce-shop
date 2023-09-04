import { useState, useEffect } from "react";
import { Table, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);

  async function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId={"name"} className={"my-2"}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type={"name"}
              placeholder={"Enter Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId={"email"} className={"my-2"}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type={"email"}
              placeholder={"Enter email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId={"password"} className={"my-2"}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={"password"}
              placeholder={"Enter Password"}
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId={"confirmpassword"} className={"my-2"}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={"password"}
              placeholder={"Confirm Password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type={"submit"} variant={"primary"} className={"my-2"}>
            Update
          </Button>

          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>Col2</Col>
    </Row>
  );
}

export default ProfileScreen;
