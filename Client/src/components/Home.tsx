import React from 'react'
import {Row,Col,Card,Button} from 'react-bootstrap'
import data from '../dummyData.js'
import { useSelector, useDispatch } from 'react-redux'
import { selectOffer } from '../features/job/jobSlice.js'
interface jobType {
  id: number,
  title: string,
  description:string,
  imageUrl: string
}

const Home = () => {
  const count = useSelector((state: RootState) => )
  const dispatch = useDispatch()
  return (
    <div style={{display:'inline-block'}} > 
    <Row >
      {data.map((job:jobType)=>(<Col key={job.id} xs={3}>
        <Card style={{marginBottom:'3%'}} >
    <Card.Img variant="top" src="holder.js/100px180"  />
    <Card.Body>
      <Card.Title>{job.title}</Card.Title>
      <Card.Text>
        {job.description.split(' ').filter((e,i)=>i<=6).join(' ')}...
      </Card.Text>
      <Button variant="primary" onClick={dispatch(selectOffer(job:jobType))}>Apply</Button>
    </Card.Body>
  </Card></Col>))}</Row></div>
  )
}

export default Home