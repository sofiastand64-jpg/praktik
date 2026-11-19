export default function CatalogSkeleton() {
  return (
    <div aria-busy="true" aria-label="Загрузка каталога товаров">
      {/* Скелетон блока категорий */}
      <section style={{ marginBottom: "40px" }}>
        <div
          className="skeleton-box"
          style={{ width: "210px", height: "28px", marginBottom: "16px" }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "22px",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                className="skeleton-box"
                style={{ width: "90px", height: "24px", borderRadius: "999px" }}
              />
              <div
                className="skeleton-box"
                style={{ width: "75%", height: "22px" }}
              />
              <div
                className="skeleton-box"
                style={{ width: "100%", height: "36px" }}
              />
              <div
                style={{
                  paddingTop: "12px",
                  borderTop: "1px solid #f1f5f9",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="skeleton-box"
                  style={{ width: "120px", height: "18px" }}
                />
                <div
                  className="skeleton-box"
                  style={{ width: "65px", height: "18px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Скелетон сетки товаров */}
      <section>
        <div
          className="skeleton-box"
          style={{ width: "260px", height: "32px", marginBottom: "20px" }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "24px",
          }}
        >
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Заглушка изображения товара */}
              <div
                className="skeleton-box"
                style={{ height: "200px", borderRadius: 0 }}
              />

              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  className="skeleton-box"
                  style={{ width: "85px", height: "14px" }}
                />
                <div
                  className="skeleton-box"
                  style={{ width: "85%", height: "22px" }}
                />

                <div style={{ display: "flex", gap: "6px" }}>
                  <div
                    className="skeleton-box"
                    style={{ width: "110px", height: "24px" }}
                  />
                  <div
                    className="skeleton-box"
                    style={{ width: "95px", height: "24px" }}
                  />
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    paddingTop: "14px",
                    borderTop: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <div
                      className="skeleton-box"
                      style={{ width: "70px", height: "14px" }}
                    />
                    <div
                      className="skeleton-box"
                      style={{ width: "105px", height: "24px" }}
                    />
                  </div>
                  <div
                    className="skeleton-box"
                    style={{
                      width: "118px",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
