module.exports.linkRegulatoryExpression = () => {
  const regulatoryExpression = /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i;
  return regulatoryExpression;
};

module.exports.emailRegulatoryExpression = /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i;
