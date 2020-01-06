export default function loadMore(res){
  const messages = []
  if(res.length > 2){
    for(let i=0; i<2; i++){
      res[i].main = true
      messages.push(res[i])
    }
    return messages
  } else{
    for(let i=0; i<res.length; i++){
      res[i].main = true
      messages.push(res[i])
    }
    return messages
  }
}