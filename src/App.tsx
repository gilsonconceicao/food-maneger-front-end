import { Button } from "./components/ui/button";

export function App() {

  function handleClick() {
    alert('Hello World')
  }

  return (
    <div>
      <h1>Hello World</h1>
      <Button onClick={handleClick}>Adicionar funcionalidade</Button>
    </div>
  )
}