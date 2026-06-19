import axios from "axios";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";


const Organizations = () => {
  const token = window.localStorage.getItem("token");

  const [organizationData, setOrganizationData] = useState<
    {
      organizationName: string;
      role: string;
      joinedAt: string;
      organizationID: number
    }[]
  >([]);

  useEffect(() => {
    const getOrganizations = async () => {
      const response = await axios.get(
        "http://localhost:3000/organizations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrganizationData(response.data.organizations);
     
    };

    getOrganizations();
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Organizations</CardTitle>

          <CardDescription>
            Here is the list of all organizations you are part of and
            associated with.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableCaption>
              Organizations you currently belong to.
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined At</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {organizationData.map((organization, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium" >
                    <Link to = {`/organizations/${organization.organizationID}`}>
                      {organization.organizationName}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {organization.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {new Date(
                      organization.joinedAt
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      Configure
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Organizations;