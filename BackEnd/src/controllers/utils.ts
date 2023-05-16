function trimAllFields(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      acc[key] = value.trim();
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}

export { trimAllFields };
  