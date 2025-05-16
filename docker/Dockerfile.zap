FROM ghcr.io/zaproxy/zaproxy:stable

# Set user to zap (already exists in the image)
USER zap

# Create directories for persistent storage
RUN mkdir -p /home/zap/.ZAP/{policies,scripts,sessions}

# Copy custom configurations
COPY policies/ /home/zap/.ZAP/policies/
COPY scripts/ /home/zap/.ZAP/scripts/

# Expose API and web UI ports
EXPOSE 8080 8090

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s \
    CMD curl -f http://localhost:8080/JSON/core/view/version || exit 1

# Startup command
CMD ["zap.sh", "-daemon", \
    "-host", "0.0.0.0", \
    "-port", "8080", \
    "-config", "api.disablekey=false", \
    "-config", "api.key=t3tgnnoanmg1je2o1pcr8a2au5", \
    "-config", "database.recoverylog=true"]