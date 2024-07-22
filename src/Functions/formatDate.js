export const formatDate = (dateString) => {
    const messageDate = new Date(dateString);
    const now = new Date();
    
    // Bugünkü mesajlar için saatı göster
    if (messageDate.toDateString() === now.toDateString()) {
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    }

    // Dün göndərilmişsə "Dünən" yaz
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
        return "Dünən";
    }

    // Bir həftə içində göndərilmişsə, günün adını yaz
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    if (messageDate >= oneWeekAgo) {
        return messageDate.toLocaleDateString('az-AZ', { weekday: 'long' }) + ' - ' + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Daha köhnə mesajlar üçün tam tarixi yaz
    return messageDate.toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: '2-digit' });
};


