import "../css/Dashboard-Card.css";

function DashboardCard ({dashboard_card_data}) {
    const date = new Date();

date.setMonth(date.getMonth() - 1);

const previousMonth = date.toLocaleString('default', {
  month: 'long'
});
    return (
        <>
            <div className="dashboard-cards">
                <div className="dashboard-card-heading">
                    <img src={dashboard_card_data.image} className="dashboard-card-icon" />
                    <p>{dashboard_card_data.heading}</p>
                </div>
                <h2 className="dashboard-card-value">${dashboard_card_data.value}</h2>
                <p>{dashboard_card_data.percentage}% vs {previousMonth} </p>
            </div>
        </>
    )
        
    
}

export default DashboardCard;