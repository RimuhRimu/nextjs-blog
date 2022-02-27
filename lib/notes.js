export const getNotes = async () => {
  const getData = await fetch('http://localhost:3008/posts')
  const notes = await getData.json()

  if (!notes) {
    return {
      notFound:true
    }
  }

  return notes
	
}
