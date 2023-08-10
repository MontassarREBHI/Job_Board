import React from 'react'
import {Row,Col,Card,Button} from 'react-bootstrap'

const JobApply = ({job}) => {
  return (
    <div>
     <Card>
      <Card.Img variant="top" src={job.imageUrl} />
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Text>{job.description}</Card.Text>
        <Button variant="primary">Apply</Button>
        <Card.Text className="mt-3">{job.companyDesc}</Card.Text>
        <Card.Text className="mt-3">Job Requirements:</Card.Text>
        <Card.Text>{job.jobRequirement}</Card.Text>
      </Card.Body>
    </Card>




    </div>
  )
}

export default JobApply