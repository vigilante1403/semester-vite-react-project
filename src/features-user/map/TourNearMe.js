
export function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  // Hàm tính khoảng cách giữa hai tọa độ (vĩ độ, kinh độ) bằng công thức Haversine
  export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Bán kính trái đất tính bằng km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Khoảng cách tính bằng km
    return distance;
  }
  

  export function getNearbyTours(tours, center, maxDistance = 50) {
    const nearbyTours = tours.filter((tour) => {
      return tour.locations.some((location) => {
        const distance = calculateDistance(
          center[0],
          center[1],
          location.coordinates[1],
          location.coordinates[0]
        );
        return distance <= maxDistance; // Kiểm tra khoảng cách
      });
    });
  
    const locations = [];
  
    nearbyTours.forEach((tour) => {
      let closestLocation = null;
      let closestDistance = Infinity;
  
      tour.locations.forEach((location) => {
        const distance = calculateDistance(
          center[0],
          center[1],
          location.coordinates[1],
          location.coordinates[0]
        );
  
        // Lưu lại vị trí gần nhất
        if (distance <= maxDistance && distance < closestDistance) {
          closestDistance = distance;
          closestLocation = location;
        }
      });
  
      // Nếu có vị trí gần nhất, thêm vào danh sách
      if (closestLocation) {
        locations.push({
          type: closestLocation.type,
          coordinates: closestLocation.coordinates,
          address: closestLocation.address,
          description: closestLocation.description,
          name: tour.name,
          day: closestLocation.day,
          id: tour.id,
        });
      }
    });
  
    return { nearbyTours, locations }; // Trả về danh sách tour và vị trí
  }
  