import { Table } from "../components";

const data = [
  { name: "John Doe", age: 30 },
  { name: "Jane Doe", age: 25 },
  { name: "James Smith", age: 35 },
  { name: "Bruce Wayne", age: 38 },
  { name: "Clark Kent", age: 39 },
  { name: "Barry Allen", age: 25 },
  { name: "Peter Parker", age: 15 },
  { name: "Tony Stark", age: 37 },
  { name: "Steve Roger", age: 105 },
  { name: "Bruce Banner", age: 36 },
];

export default function Tabular() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Table title="Data Mahasiswa" data={data} />
    </div>
  );
}
