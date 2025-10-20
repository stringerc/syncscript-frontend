# Cursor Operation Rules for SyncScript Audit

## Core Principles

1. **Automation First**: All audit processes must be automated and repeatable
2. **Data-Driven**: All decisions based on measurable metrics and reports
3. **Zero Regression**: CI gates prevent quality degradation
4. **Comprehensive Coverage**: 100% of routes, components, and features must be audited

## File Organization

### Audit Reports Location
- All reports go in `/audits/reports/`
- Use consistent naming: `feature-inventory.csv`, `mock-map.csv`, etc.
- Include timestamps in report filenames for versioning

### Code Structure
- Static analysis scripts in `/audits/static-analysis/`
- Playwright tests in `/audits/playwright/`
- Data contracts in `/audits/contracts/`
- Cursor prompts in `/system/cursor/prompts/`

## Quality Standards

### CSV Reports
- Must include headers
- Use consistent column naming
- Include timestamps and metadata
- Validate data integrity

### Code Quality
- All scripts must be TypeScript
- Include comprehensive error handling
- Add JSDoc documentation
- Unit tests for all utilities

### Testing Requirements
- Playwright tests must be deterministic
- Include screenshots for visual validation
- Test both authenticated and unauthenticated states
- Cover mobile, tablet, and desktop viewports

## Error Handling

### Graceful Degradation
- Scripts must continue running if individual components fail
- Log all errors with context
- Provide fallback mechanisms
- Include retry logic for network operations

### Reporting
- All errors must be captured in reports
- Include error context and suggested fixes
- Prioritize errors by impact (user-facing vs internal)

## Performance Standards

### Execution Time
- Static analysis: < 5 minutes
- Playwright crawler: < 30 minutes
- Report generation: < 2 minutes
- Total audit cycle: < 45 minutes

### Resource Usage
- Minimize memory footprint
- Use streaming for large files
- Implement progress indicators
- Clean up temporary files

## Security Considerations

### Data Handling
- Never log sensitive information
- Sanitize all user inputs
- Use environment variables for credentials
- Implement proper authentication flows

### Access Control
- Respect authentication requirements
- Test both public and protected routes
- Validate permission boundaries
- Include security headers in tests

## Maintenance

### Regular Updates
- Update audit scripts weekly
- Review and update contracts monthly
- Refresh test data quarterly
- Annual security audit review

### Documentation
- Keep all documentation current
- Include setup and troubleshooting guides
- Document all configuration options
- Provide examples and use cases
