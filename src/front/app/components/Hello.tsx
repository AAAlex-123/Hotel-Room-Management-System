
type Props = {
  promise: Promise<string>;
}
export default async function Hello({ promise }: Props) {
  const text = await promise
  return <h1>Text={text}</h1>
}