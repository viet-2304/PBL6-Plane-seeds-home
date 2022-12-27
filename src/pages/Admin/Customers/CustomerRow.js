import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

const CustomerRow = ({ customer }) => {
    // const isTester = useSelector((state) => state.currentUser?.firstName);
    return (
        <tr className="text-center align-middle fs-4">
            <td>{customer.phoneNumber}</td>
            <td id="emailBar">{customer.email}</td>
            <td>{customer.address}</td>
            <td className="bg-success bg-opacity-10">
                {customer.active === true ? 'Active' : 'unActive'}
            </td>
            <td>{customer.userName}</td>
            <td>
                <img
                    src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg"
                    width={40}
                    alt=""
                ></img>
            </td>
            <td>{customer.roleId}</td>
            <td>
                <Button variant="link fs-4" href={`/admin/customers/update/${customer.id}`}>
                    EDIT
                </Button>
                <Button variant="link fs-4">
                    <Trash color="FIreBrick" />
                </Button>
            </td>
        </tr>
    );
};

export default CustomerRow;
