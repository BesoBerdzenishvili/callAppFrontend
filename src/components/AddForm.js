import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import styled from "styled-components";
import { useData } from "../utils/useData";

const Wrapper = styled.div`
  max-width: 744px;
  width: 100%;
  border: 1px solid blue;
  padding: 8px;
  background-color: #ffffff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;
const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function AddForm({ onClick, id }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");

  const addCitizen = useData((state) => state.createCitizen);

  const handleSubmit = (e) => {
    // e.preventDefault();
    addCitizen({
      id: id,
      name: name,
      email: email,
      gender: gender,
      address: {
        street: street,
        city: city,
      },
      phone: phone,
    });
  };
  return (
    <Wrapper>
      <CloseBtn>
        <Button onClick={() => onClick(false)} color="danger">
          X
        </Button>
      </CloseBtn>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleName">Name</Label>
          <Input
            id="exampleName"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name..."
            type="name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
            type="email"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Gender</Label>
          <Input
            id="exampleSelect"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            name="select"
            type="select"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleCity">City</Label>
          <Input
            id="exampleCity"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City..."
            type="text"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleStreet">Street</Label>
          <Input
            id="exampleStreet"
            name="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street..."
            type="text"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePhone">Phone</Label>
          <Input
            id="examplePhone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone..."
            type="number"
            required
          />
        </FormGroup>
        <Button color="info">Submit</Button>
      </Form>
    </Wrapper>
  );
}
