document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const detailsDiv = document.getElementById('confirmation-details');
    
    if (!detailsDiv) return;

    let output = '<table>';
    
    const requiredFields = {
        'fname': 'Primeiro Nome',
        'lname': 'Sobrenome',
        'email': 'Email',
        'phone': 'Telefone Celular',
        'orgname': 'Nome da Organização',
        'timestamp': 'Timestamp de Envio'
 
    };

    for (const [key, label] of Object.entries(requiredFields)) {
        const value = params.get(key);
        
        if (key === 'timestamp' && value) {
            const date = new Date(parseInt(value));
            output += `
                <tr>
                    <td><strong>${label}:</strong></td>
                    <td>${date.toLocaleString('pt-BR')}</td>
                </tr>
            `;
        } else if (value) {
            output += `
                <tr>
                    <td><strong>${label}:</strong></td>
                    <td>${value}</td>
                </tr>
            `;
        }
    }
    
    output += '</table>';
    
    if (params.toString()) {
        detailsDiv.innerHTML = output;
    } else {
        detailsDiv.innerHTML = '<p>Nenhuma informação de formulário encontrada.</p>';
    }
});