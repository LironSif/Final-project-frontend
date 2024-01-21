import React from 'react'

const renderStorageRecommendations = (chemical) => {
    let recommendations = [];

    if (chemical.STATE === "Gas") {
      recommendations.push("Store above solids and liquids");
    } else if (chemical.STATE === "Solid") {
      recommendations.push("Store above liquids");
    }

    if (chemical.FLAMMABLE || chemical.CORROSIVE) {
      recommendations.push("Do not store next to oxidizers");
    }

    return recommendations.join(", ");
  };

export default renderStorageRecommendations