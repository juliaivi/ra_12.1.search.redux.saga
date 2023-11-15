export const searchSkills =  async (search) => {
    const params = new URLSearchParams({q: search}); //URLSearchParams (q=react)— это класс, предоставляющий удобное API для формирования строки поисковых параметров, которую потом можно использовать для формирования полного адреса. Все параметры в строке будут закодированы для безопасной вставки в адрес. Также этот класс можно встретить как часть класса URL.

    const response  = await fetch(`http://localhost:7070/api/search?${params}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}