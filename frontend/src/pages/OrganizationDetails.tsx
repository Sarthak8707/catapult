import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OrganizationDetails = () => {

    const {id} = useParams();

    const [projectData, setProjectData] = useState<{
        name: string,
        createdAt: string
    }[]
    >([]);
    useEffect(() => {

        const getProjects = async () => {

            const response = await axios.get(`http://localhost:3000/organizations/${id}/projects`);
            setProjectData(response.data.projectsList);
            console.log(response.data.projectsList)

        }

        getProjects();

        
    }, [])

  return (
    <div className='border-gray-200 p-6 border min-h-screen'>
        <div className='flex flex-row gap-80 justify-center'>
        <div>
            <Card className='w-150'>
            <CardHeader>
                <CardTitle> Organization Name </CardTitle>
            </CardHeader>
            <CardPanel>
                <p>Projects</p>
                <p>Members</p>
                <p>Created By</p>
                <p>Your Role</p>
            </CardPanel>
        </Card>
        </div>
        <div className='flex gap-5'>
            <Button variant="destructive">Leave Organization</Button>
            <Button> Start New Project </Button>
        </div>
    </div>

    <div className='mt-10'>
        <Card>
            <CardHeader>
                <CardTitle> Organization's Projects </CardTitle>
                <CardDescription> All the projects of your organization are listed here </CardDescription>
            </CardHeader>
            <CardPanel>
                <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Created On</TableHead>
                    <TableHead className='px-6 text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {projectData.map((project, index) => (
                    <TableRow >
                        <TableCell> {project.name} </TableCell>
                        <TableCell> { new Date(project.createdAt).toLocaleDateString() } </TableCell>
                        <TableCell className='text-right'> <Button variant="outline" > Configure </Button> </TableCell>
                    </TableRow>
                ))}
            </TableBody>
                </Table>
            </CardPanel>
        </Card>
    </div>
    </div>
  )
}

export default OrganizationDetails