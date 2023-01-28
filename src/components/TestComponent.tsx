import {Text} from 'react-native';
import {useQuery} from '@tanstack/react-query'

export function TestComponent() {
  const {data, isLoading} = useQuery({
    queryKey: ['star wars'],
    queryFn: () =>
      fetch('https://swapi.dev/api/planets/1/', {method: 'GET'}).then(res => res.json())
  })

  return (
    <>
      <Text>This is a test component!</Text>
      {isLoading ? <Text>fetching data...</Text> : <Text>data is {JSON.stringify(data)}</Text>}
    </>
  )
}
