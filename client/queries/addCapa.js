import gql from 'graphql-tag';

const addCapa = gql`
    mutation addCapa(
        $title: String,
        $client: Int,
        $capaOwner: String,
        $assignedBy: String,
        $department: String,
        $riskLevel: String,
        $investigationStatus: String,
        $capaPlanStatus: String,
        $effectivenessStatus: String,
        $investigationDueDate: String,
        $dateAssigned: String        
    ){ 
    addCapa(
        title: $title,
        client: $client,
        capaOwner: $capaOwner,
        assignedBy: $assignedBy,
        department: $department,
        riskLevel: $riskLevel,
        investigationStatus: $investigationStatus,
        capaPlanStatus: $capaPlanStatus,
        effectivenessStatus: $effectivenessStatus,
        investigationDueDate: $investigationDueDate,
        dateAssigned: $dateAssigned
    ){
        title
        client
        capaOwner
        assignedBy
        department
        riskLevel
        investigationStatus
        capaPlanStatus
        effectivenesStatus
        investigationDueDate
        dateAssigned
    }}
`;


export default addCapa;