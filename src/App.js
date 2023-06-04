import "./App.css";
import { useState } from "react";
import { Random } from "random-js";
import {
  Container,
  Header,
  Segment,
  Form,
  Button,
  Table,
} from "semantic-ui-react";

function App() {
  const [numberList, setNumberList] = useState([]);
  const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenNumber, setChosenNumber] = useState("");
  const random = new Random();

  const handleInputChange = (event) => {
    setEnteredNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNumberList([...numberList, parseInt(enteredNumber)]);
    setChosenNumber(parseInt(enteredNumber));
  };

  const handleGenerateNumber = () => {
    let rndNumber;
    do {
      rndNumber = random.integer(1, 75);
    } while (numberList.includes(rndNumber));

    setNumberList([...numberList, rndNumber]);
    setChosenNumber(rndNumber);
  };

  const renderTable = () => {
    const cells = Array.from({ length: 80 }, (_, index) => {
      const number = index + 1;
      const isGenerated = number === chosenNumber;
      const isAppeared = numberList.includes(number);
      const cellStyle =
        isGenerated || isAppeared ? { backgroundColor: "green" } : {};

      return (
        <Table.Cell key={number} style={cellStyle}>
          {number <= 75 ? number : ""}
        </Table.Cell>
      );
    });

    const rows = Array.from({ length: 8 }, (_, rowIndex) => {
      const startIndex = rowIndex * 10;
      const endIndex = startIndex + 10;
      const rowCells = cells.slice(startIndex, endIndex);

      return <Table.Row key={rowIndex}>{rowCells}</Table.Row>;
    });

    return (
      <Table celled>
        <Table.Body>{rows}</Table.Body>
      </Table>
    );
  };
  return (
    <Container>
      <Header
        as="h1"
        style={{ textAlign: "center", fontSize: "40px", paddingTop: "50px" }}
      >
        Li Yang and Charmaine Wedding - Bingo Time
      </Header>
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Enter Number</label>
            <input type="number" onChange={handleInputChange} />
          </Form.Field>
          <Button type="submit" basic color="red">
            Submit
          </Button>
        </Form>
        <Button
          color="red"
          basic
          onClick={handleGenerateNumber}
          style={{ marginTop: "20px" }}
        >
          I am feeling lucky
        </Button>
        <Header as="h1" style={{ fontSize: "80px" }}>
          {chosenNumber}
        </Header>
        {renderTable()}
      </Segment>
    </Container>
  );
}

export default App;
