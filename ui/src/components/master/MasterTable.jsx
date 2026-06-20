import "./MasterTable.css";

export default function MasterTable({
    title,
    rows,
    onAdd
}) {

    return (

        <div className="master-wrapper">

            <div className="master-header">

                <h2>{title}</h2>

                <button onClick={onAdd}>
                    Add New
                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Description</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        rows.map(row => (
                            <tr key={row.id}>

                                <td>{row.id}</td>

                                <td>{row.name}</td>

                                <td>{row.description}</td>

                                <td>

                                    👁 ✏ ✖

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}