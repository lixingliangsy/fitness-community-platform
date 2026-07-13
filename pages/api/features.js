
// pages/api/features.js
// Features list API

export default function handler(req, res) {
  res.status(200).json({
    product: 'fitness-community-platform',
    features: [
      // TODO: list implemented features
      {
        id: 'feature_001',
        name: 'Example Feature',
        status: 'implemented',
        description: 'Description of the feature'
      }
    ],
    upcoming: [
      // TODO: list upcoming features
      {
        id: 'upcoming_001',
        name: 'Upcoming Feature',
        status: 'in_development',
        expectedRelease: '2026-Q3'
      }
    ]
  });
}
