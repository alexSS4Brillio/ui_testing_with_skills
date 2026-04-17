import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function UserPage() {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [colDefs] = useState([
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'username', headerName: 'Username', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1.5 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        { field: 'website', headerName: 'Website', flex: 1 },
        {
            field: 'address.city',
            headerName: 'City',
            flex: 1,
            valueGetter: (params) => params.data.address?.city
        },
        {
            field: 'company.name',
            headerName: 'Company',
            flex: 1,
            valueGetter: (params) => params.data.company?.name
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setRowData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ height: 600, width: '100%' }} className="ag-theme-quartz">
            <h2>Users Management</h2>
            <p style={{ marginBottom: '1rem', color: '#666' }}>Click on any row to view detailed user information</p>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 20, 50, 100]}
                theme="legacy"
                onRowClicked={(event) => navigate(`/user/${event.data.id}`)}
                defaultColDef={{
                    sortable: true,
                    filter: true,
                    resizable: true
                }}
            />
        </div>
    );
}